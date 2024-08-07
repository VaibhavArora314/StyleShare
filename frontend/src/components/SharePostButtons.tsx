import {
    TwitterShareButton,
    LinkedinShareButton,
    FacebookShareButton,
    TelegramShareButton,
    LinkedinIcon,
    FacebookIcon,
    TelegramIcon,
    XIcon,
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";

type Props = {
    shareUrl: string,
    title: string
};

const SharePostButtons = ({shareUrl, title}: Props) => {
  return (
    <div className="flex space-x-2 my-4">
      <div className="hover:scale-125 transform transition duration-400">
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={35} round />
        </TelegramShareButton>
      </div>
      <div className=" hover:scale-125 transform transition duration-400">
        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon size={35} round />
        </TwitterShareButton>
      </div>
      <div className=" hover:scale-125 transform transition duration-400">
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={35} round />
        </WhatsappShareButton>
      </div>
      <div className=" hover:scale-125 transform transition duration-400">
        <LinkedinShareButton url={shareUrl} title={title} summary={title}>
          <LinkedinIcon size={35} round />
        </LinkedinShareButton>
      </div>
      <div className=" hover:scale-125 transform transition duration-400">
        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={35} round />
        </FacebookShareButton>
      </div>  
    </div>
  );
};

export default SharePostButtons;
