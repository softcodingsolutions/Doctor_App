function Avatar({ firstName, lastName }) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;


  const generateAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash & 0xFF0000) >> 16; 
    const g = (hash & 0x00FF00) >> 8; 
    const b = hash & 0x0000FF;         
    return `rgb(${r}, ${g}, ${b})`;    
  };

  
  const avatarColor = generateAvatarColor(firstName + lastName);

  const avatarStyle = {
    backgroundColor: avatarColor,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'white',
  };

  return (
    <div style={avatarStyle}>
      {initials}
    </div>
  );
}

export default Avatar;
