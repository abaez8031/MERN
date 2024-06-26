import { createSuggestion } from "../../../store/suggestions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./CreateSuggestionsForm.css"
import { clearSuggestionErrors } from "../../../store/suggestions";

const CreateSuggestionsForm = () => {
  const dispatch = useDispatch();
  const [text,setText] = useState("");
  const userId = useSelector(state => state.session.user?._id)
  const errors = useSelector(state => state.errors.suggestions)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSuggestion({userId ,text}));
    setText("");
  }

  const handleTextChange = (e) => {
    dispatch(clearSuggestionErrors())
    setText(e.target.value);
  }

  useEffect(() => {
    return () => {
      dispatch(clearSuggestionErrors());
    };
  }, [dispatch]);
  // when errors are rendered the button is not centered
  return (
    <>
    <div className="suggestion-form-container">
      <form className="suggestion-form" onSubmit={handleSubmit}>
        <div className="suggestions-text-area-container">
        <textarea className="suggestion-form-text" value={text} onChange={handleTextChange} placeholder="Enter your suggestion"/>
        <div className="errors">{errors?.text}</div>
        </div>
        <button className="suggestion-form-submit"type="submit">Create Suggestion</button>
      </form>
    </div>
    </>
  )
}

export default CreateSuggestionsForm;