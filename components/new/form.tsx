import React, { useState } from "react";

interface INewFormProps {
    onSubmit: ({name, password}) => void
}

const NewForm = (props: INewFormProps) => {
  const [name, setName] = useState('');
  const [usePassword, setUseVisible] = useState(false);
  const [password, setPassword] = useState('');
  const onSubmitForm = () => {
      props.onSubmit({
          name,
          password: usePassword ? password : null
      });
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="roomName">Name</label>
        <input
          type="text"
          className="form-control"
          id="roomName"
          aria-describedby="emailHelp"
          placeholder="Enter a name for the new room"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="roomUsePassword"
          checked={usePassword}
          onChange={e => setUseVisible(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="roomUsePassword">
          Use password
        </label>
      </div>

      <div className={`form-group collapse ${usePassword ? "show" : ""}`}>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <small id="passportHelp" className="form-text text-muted">
          You can change it later.
        </small>
      </div>

      <button onClick={onSubmitForm} className="btn btn-primary">
        Create
      </button>
    </div>
  );
};

export default NewForm;