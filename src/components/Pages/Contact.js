import { useRef } from "react";
import { Container } from "react-bootstrap";

const Contact = () => {
  const nameInput = useRef();
  const emailInput = useRef();
  const numInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const userDetail={
     userName:nameInput.current.value,
      userEmail:emailInput.current.value,
      userPhoneNumber:numInput.current.value,
    }
    fetch("https://userdata-17288-default-rtdb.firebaseio.com/contacts.json/",{
      method:"POST",
      body: JSON.stringify(userDetail),
        headers: {
          "Contact-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    nameInput.current.value="";
    emailInput.current.value=""
    numInput.current.value=""
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "8%" }}>Contact Us</h1>
      <Container style={{ marginLeft: "10%", display: "flex", justifyContent: "center", marginBottom: "10%" }}>
        <form style={{ width: "35%" }} onSubmit={submitHandler}>
          <div className="form-group my-4">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name" ref={nameInput} />
          </div>
          <div className="form-group my-4">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="name@example.com" ref={emailInput} />
          </div>
          <div className="form-group my-4">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control" id="phone" placeholder="123-456-7890" ref={numInput} />
          </div>
          <button type="submit" className="btn btn-primary my-4 mx-auto d-block">Submit</button>
        </form>
      </Container>
    </>
  );
};

export default Contact;
