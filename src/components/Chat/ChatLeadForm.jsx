import { useEffect, useState, useRef } from 'react';
import { TiMessages } from 'react-icons/ti';
import { IoMdCloseCircleOutline, IoMdSend } from 'react-icons/io';
import './Chat.css'; // Ensure you have your styles defined
import axios from 'axios';

function ChatComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const messageContainerRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    health_issue: '',
    doctor_id: '',
  });
  const [shouldAskQuestions, setShouldAskQuestions] = useState(true);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const questions = [
    {
      text: '👋 Hi! Which doctor would you like to contact?',
      type: 'select',
    },
    { text: 'What’s your name?', field: 'name' },
    { text: 'How old are you?', field: 'age' },
    { text: 'What’s your phone number?', field: 'phone' },
    { text: 'What health issue are you facing?', field: 'health_issue' },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/v1/users');
        const doctorList = response.data.users.filter(user => user.role === 'doctor');
        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const addMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleNextStep = () => {
    if (step < questions.length - 1) {
      setStep((prevStep) => prevStep + 1);
    } else {
      setIsReadyToSubmit(true);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    const currentField = questions[step].field;
    if (currentField) {
      setFormData((prevData) => ({ ...prevData, [currentField]: input }));
    }

    addMessage({ sender: 'user', text: input });

    handleNextStep();

    setInput('');
  };

  const handleDoctorSelect = (e) => {
    const selectedDoctorId = e.target.value;
    setFormData((prevData) => ({ ...prevData, doctor_id: selectedDoctorId }));

    const selectedDoctor = doctors.find((doc) => doc.id === parseInt(selectedDoctorId));
    addMessage({
      sender: 'system',
      text: `You selected Dr.${selectedDoctor.first_name} ${selectedDoctor.last_name}.`,
    });

    handleNextStep();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/leads', formData);
      addMessage({ sender: 'system', text: response.data.message });

      setFormData((prevData) => ({
        ...prevData,
        name: '',
        age: '',
        phone: '',
        doctor_id: '',
      }));
      setStep(0);
      setShouldAskQuestions(false);
    } catch (error) {
      console.error('Error submitting lead:', error);
      addMessage({
        sender: 'system',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  const confirmSubmit = () => {
    setIsReadyToSubmit(false); 
    handleSubmit(); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(0);
    setMessages([]);
    setFormData({
      name: '',
      age: '',
      phone: '',
      health_issue: '',
      doctor_id: '',
    });
    setShouldAskQuestions(true);
  };

  const handleDoctor = (first_name , last_name) =>{
    if(first_name === "Bhavesh" || last_name === "Thakker"){
      return <div>Dr. Bhavesh Thakker(Weight Loss)</div>
    }
    else if(first_name === "Nidhi" || last_name === "Shah"){
      return <div>Dr. Nidhi Shah (Beauty Care)</div>
    }
    else if(first_name === "Rupali" || last_name === "Pathak"){
      return <div>Dr. Dipali Pathak (Skin Specialist)</div>
    }
  }

  return (
    <div id="chat-app">
      <div
        id="chat-icon"
        onClick={() => setIsModalOpen(true)}
        className="bottom-5 right-5 w-14 h-14 bg-[#1F2937] rounded-full flex justify-center items-center cursor-pointer relative"
      >
        <TiMessages size={40} className="text-white" />
      </div>

      {isModalOpen && (
        <div
          id="chat-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
        >
          <div className="bg-white w-2/5 h-3/4 p-4 rounded-md shadow-lg flex flex-col">
            <div className="flex items-center justify-between border-b pb-2 mb-2">
              <h2 className="font-bold text-lg">Chat with Doctor</h2>
              <IoMdCloseCircleOutline
                onClick={closeModal}
                size={25}
                className="cursor-pointer"
              />
            </div>

            <div
              ref={messageContainerRef}
              id="messages"
              className="flex-grow overflow-y-auto p-2 space-y-4"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-lg shadow-md max-w-xs w-fit ${
                      msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {shouldAskQuestions && step < questions.length && questions[step].type === 'select' && (
                <div className="p-4 rounded-lg shadow-md max-w-xs w-fit  text-black">
                  {questions[step].text}
                  <select onChange={handleDoctorSelect} className="doctor-select border rounded p-2">
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {handleDoctor(doctor.first_name,doctor.last_name)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {shouldAskQuestions && step < questions.length && questions[step].type !== 'select' && !isReadyToSubmit && (
                <div className="p-3 rounded-lg shadow-md max-w-xs w-fit bg-gray-200 text-black">
                  {questions[step].text}
                </div>
              )}

              {isReadyToSubmit && (
                <div className="p-3 rounded-lg shadow-md max-w-xs w-fit bg-gray-200 text-black">
                  <div>Are you sure you want to submit your information?</div>
                  <button onClick={confirmSubmit} className="text-blue-500 mr-3">
                    Yes
                  </button>
                  <button onClick={() => setIsReadyToSubmit(false)} className="text-red-500">
                    No
                  </button>
                </div>
              )}
            </div>

            {shouldAskQuestions && step < questions.length && questions[step].type !== 'select' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center border-t pt-2 space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your response..."
                  className="flex-grow p-2 border rounded-md focus:outline-none"
                />
                <button type="submit" className="text-blue-500">
                  <IoMdSend size={25} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
