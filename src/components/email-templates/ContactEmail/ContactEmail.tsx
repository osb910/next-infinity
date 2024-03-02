export interface ContactEmailProps {
  email: string;
  name: string;
  body: string;
  lang?: string;
}

const ContactEmail = ({email, name, body, lang}: ContactEmailProps) => {
  return (
    <section>
      <h1>
        {name} ({email}) says:
      </h1>
      <p>{body}</p>
    </section>
  );
};

export default ContactEmail;
