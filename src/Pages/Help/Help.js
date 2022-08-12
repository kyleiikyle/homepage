import React, { useState } from "react";
import FAQ from "../../Components/FAQ/FAQ.js";
import "./help.css";

function Help() {
  const [faqs, setfaqs] = useState([
    {
      question: "What is Group Up?",
      answer:
        "This is a social platform for users to get involved in activities.",
      open: false,
    },
    {
      question: "What type of activities is on Group Up?",
      answer:
        "These activities are based around sports and fitness including football, tennis, running and more.",
      open: false,
    },
    {
      question: "What activities can I join?",
      answer:
        "Users can join any activities, unless conditioned for a set gender or maximum capacity has been reached.",
      open: false,
    },
    {
      question: "Can I create my own activity?",
      answer:
        "Activities can be created using the 'Organise' page. This page allows the user to create their activity by completing a form detailing activity information.",
      open: false,
    },
    {
      question: "Can I use Group Up on my smartphone?",
      answer:
        "You may already have found out if you're using your smartphone! Yes, Group Up is designed to be compatible with your smartphone.",
      open: false,
    },
    {
      question: "Do I need a subscription to use Group Up?",
      answer: "Group Up is free to use! No subscription necessary.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="help-background">
      <div className="FAQTitle">
        <h1 className="faq-Title">Frequently Asked Questions</h1>
      </div>
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}

        <div className="contactUs">
          <h2 className="cant-find-title">Can't find your answer?</h2>
          <div className="contactUsButton">
            <a className="contactUsBtn" href="/contactUs">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
