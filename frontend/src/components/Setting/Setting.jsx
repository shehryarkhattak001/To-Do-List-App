import React, { useState } from "react";

const Setting = ({ updateProfile, setActiveSection }) => {
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [title, setTitle] = useState(""); // Add title state

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };

  const handleAvatarSelect = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  const handleSubmit = () => {
    updateProfile({
      image: file || avatar,
      firstName,
      lastName,
      bio,
      title, // Include title in updated profile
    });

    setActiveSection("todoDashboard");
  };

  return (
    <div className="settings-wrapper">
      <h1>Profile Settings</h1>

      <div className="profile-picture-wrapper">
        <div className="profile-picture-circle">
          <img src={file || avatar} alt="Profile" />
        </div>

        <div className="upload-buttons">
          <button>
            <label htmlFor="file-upload">Choose from Files</label>
            <input
              type="file"
              id="file-upload"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </button>
          <button onClick={() => setAvatar("default-avatar.png")}>
            Choose from Avatar
          </button>
        </div>
      </div>

      <div className="input-fields">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title" // Add title input field
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Setting;
