function Avatar({ firstName, lastName, avatarColor }) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
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

