document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  console.log('Socket.IO connected:', socket.connected);

  socket.on('newQrCode', (event) => {
      console.log('New QR Code event:', event);
      const {status, msg, qrcode} = event;        
      if(status === false){
            document.getElementById('msg').innerHTML = msg;
            document.getElementById('qrCodeImage').innerHTML ='';
      } else {
            document.getElementById('msg').innerHTML = msg;
            const qrCodeImage = document.getElementById('qrCodeImage');
            qrCodeImage.src = 'data:image/png;base64,' + qrcode;   
      }     
  });
});
