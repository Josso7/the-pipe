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
      }
    return (
        <div className='video-upload-container'>
            <input className='video-upload-input' type='file'
            onChange={(e) => {
                uploadFile(e);
            }}
            >
            </input>
        </div>
    )
}

export default Cloudinary
