import { useSelector } from "react-redux";
import SuggestionsList from "../SuggestionsList/SuggestionsList";
import CreateSuggestionsForm from "../CreateSuggestionsForm.jsx/CreateSuggestionsForm";
import "./SuggestionsPage.css"


const SuggestionsPage = () => {
  // suggestions list and heading is not resize responsive
  const currentUserId = useSelector(state => state.session.user?._id)

  return (
  <>
  <div className="suggestions-page-container">
    <h1 className="suggestions-page-heading">Tell us what we can do better!</h1>
    {currentUserId && <CreateSuggestionsForm/>}
    <SuggestionsList userId={currentUserId}/>
  </div>
  </>
  )
}

export default SuggestionsPage;