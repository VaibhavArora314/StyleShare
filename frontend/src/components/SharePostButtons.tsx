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
      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={35} round />
      </TelegramShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={35} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={35} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={shareUrl} title={title} summary={title}>
        <LinkedinIcon size={35} round />
      </LinkedinShareButton>
      <FacebookShareButton url={shareUrl} title={title}>
        <FacebookIcon size={35} round />
      </FacebookShareButton>
    </div>
  );
};

export default SharePostButtons;
