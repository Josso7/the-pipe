function Cloudinary(){


    const uploadFile = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'vc4ugcc1');
        const res = await fetch('https://api.cloudinary.com/v1_1/dbxywjkcf/video/upload', {
          method: 'POST',
          body: data
        });
        const file = await res.json();
        console.log(file);
      }
    return (
        <div className='video-upload-container'>
            <input className='video-upload-input' type='file'
            onChange={(e) => {
                console.log(e.target.files[0]);
                uploadFile(e);
            }}
            >
            </input>

            <video controls>
                <source src="https://res.cloudinary.com/dbxywjkcf/video/upload/ojxigs6ml5euavaomjxx.mp4" type="video/mp4"/>
                <source src="rabbit320.webm" type="video/webm"/>
                <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
            </video>
        </div>
    )
}

export default Cloudinary
