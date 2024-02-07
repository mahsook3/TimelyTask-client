import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const PhoneVerification = ({ handlePhoneNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const handleSendCode = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        // SMS sent. You can now display the OTP input field.
      })
      .catch((error) => {
        // Error occurred while sending SMS.
        console.error(error);
      });
  };

  const handleVerifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Phone number verified successfully.
        console.log('Phone number verified:', result.user);
      })
      .catch((error) => {
        // Error occurred while verifying OTP.
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Phone Verification</h2>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
      />
      <button onClick={handleSendCode}>Send</button>

      <div id="recaptcha-container"></div>

      {verificationId && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify</button>
        </>
      )}
    </div>
  );
};

export default PhoneVerification;
