
import { WhatsappShareButton } from 'react-share';
import CompartirIcono from '../../../assets/images/share.svg'

const ShareButton = () => {
    const handleCopyLinkPc = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL);
        alert('Enlace copiado al portapapeles');
      };

    const handleCopyLinkMobile = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL);
      };

      return (
        <div style={{ marginLeft: 'auto' }}>
          {navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ? (
            <WhatsappShareButton url={window.location.href}>
              <button
                className="flex items-center bg-transparent border-none focus:outline-none mr-5"
                onClick={handleCopyLinkMobile}
                style={{
                  backgroundImage: `url(${CompartirIcono})`,
                  backgroundSize: 'cover',
                  width: '45px',
                  height: '45px',
                }}
              />
            </WhatsappShareButton>
          ) : (
            <button
              className="flex items-center bg-transparent border-none focus:outline-none mr-5"
              onClick={handleCopyLinkPc}
              style={{
                backgroundImage: `url(${CompartirIcono})`,
                backgroundSize: 'cover',
                width: '45px',
                height: '45px',
              }}
            />
          )}
        </div>
      );
};

export default ShareButton;