import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import bgHero from "../assets/bgHero.png";
import formImage1 from "../assets/Contact-us.png";
import formImage2 from "../assets/Contact-us1.png";
import formImage3 from "../assets/Contact-us2.png";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const images = [formImage1, formImage2, formImage3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeTransition, setFadeTransition] = useState(true);

  document.title = 'Style Share | Reach us 📱';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeTransition(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeTransition(true); 
      }, 500); 
    }, 5000);

    return () => clearInterval(intervalId); 
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, subject, message);
   
    if (!name || !email || !subject || !message) {
      setError({
        ...error,
        message: "All fields are required.",
      });
      toast.error("All fields are required.");
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post("/api/v1/user/contact-us", {
        name,
        email,
        subject,
        message,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setError({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (e) {
      console.error("Error sending message:", error);
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <div className="flex flex-col  items-center min-h-screen text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="text-4xl font-bold mb-8 text-center text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-8">
        Contact Us
      </h2>
      <section className="w-full max-w-4xl flex flex-col md:flex-row text-[#000435] bg-white dark:text-white dark:bg-[#000435] rounded-lg shadow border md:mt-0 border-blue-700 dark:border-sky-500">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500 focus:border-blue-600 focus:ring focus:ring-blue-200"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500 focus:border-blue-600 focus:ring focus:ring-blue-200"
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="form-input text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500 focus:border-blue-600 focus:ring focus:ring-blue-200"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="form-input text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500 focus:border-blue-600 focus:ring focus:ring-blue-200"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              ></textarea>
              <p className="text-sm font-semibold mt-2 text-red-600">
                {error.message}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className={`w-full md:w-1/2 flex justify-center items-center p-8 transition-opacity duration-1000 ease-in-out ${fadeTransition ? 'opacity-100' : 'opacity-0'}`}>
        <img src={images[currentImageIndex]} alt="Contact Us" className="max-w-full h-auto rounded-lg transform hover:translate-y-2 transition-transform duration-700 ease-in-out" style={{ width: '90rem', height: 'auto' }} />
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
