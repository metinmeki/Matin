<form 
  action="https://formsubmit.co/metinmeki99@gmail.com"
  method="POST"
>
  {/* Disable Captcha */}
  <input type="hidden" name="_captcha" value="false" />

  {/* Redirect after submit */}
  <input type="hidden" name="_next" value="https://metinmeki.github.io/Matin/success.html" />

  <div className="input-container d-flex flex-column">
    <label htmlFor="username" className="label-class">Full Name</label>
    <input
      type="text"
      className="form-input input-class"
      name="name"
      placeholder="Enter your name"
      required
    />
  </div>

  <div className="input-container d-flex flex-column">
    <label htmlFor="email" className="label-class">Email address</label>
    <input
      type="email"
      className="form-input input-class"
      name="email"
      placeholder="Enter email"
      required
    />
  </div>

  <div className="input-container d-flex flex-column">
    <label htmlFor="userMessage" className="label-class">Message</label>
    <textarea
      className="form-message input-class"
      name="message"
      rows="3"
      placeholder="Enter message"
      required
    ></textarea>
  </div>

  <div className="submit-btn">
    <button type="submit" className="submitBtn">
      Submit <AiOutlineSend className="send-icon" />
    </button>
  </div>
</form>
