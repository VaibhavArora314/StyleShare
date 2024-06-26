import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import bgHero from "../assets/bgHero.png";

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

  document.title='Style Share | Reach us 📱'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, subject, message);
    // Basic validation
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

    <div className="text-[#000435] bg-white dark:text-white dark:bg-[#000435]"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="flex justify-center p-12 md:bg-grey-500">
        <div className="w-full text-[#000435] bg-white dark:text-white dark:bg-[#000435] rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-blue-700 dark:border-sky-500"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4  text-center text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="form-input text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-input text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-1 p-2 block w-full rounded-lg border border-blue-500"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                ></textarea>
                <p className="text-sm font-semibold mb-2 text-red-600">
                  {error.message}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs