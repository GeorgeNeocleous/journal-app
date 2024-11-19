

/*
<HomePage>
    <EntryForm />
    <LatestPosts limit={5} />
</HomePage>

<JournalEntryContainer>
    // Toggle between <EntryForm /> and <ViewForm />
    <EntryForm entryId={asffgstgew2342352} />
</JournalEntryContainer>
*/

import { useState } from "react";
import { useJournalEntriesData, useJournalEntriesSetter } from "../contexts/EntriesContext";


// Because the JournalEntry page will find posts via entryIds, entryIds needs to be passed in as a prop so it can be used
export default function EntryForm({entryId}){
    let journalEntriesData = useJournalEntriesData();
    let setJournalEntries = useJournalEntriesSetter();

    // If entry id is provided as a prop then it is used in the state, if it is not there, then an empty string is used ""
    let [localId, setLocalId] = useState(entryId ? entryId.toString() : crypto.randomUUID());
    let [localType, setLocalType] = useState("journal");
    let [localName, setLocalName] = useState("Default Post Name");
    let [localContent, setLocalContent] = useState("Write your journal entry here.");
    let [localAuthor, setLocalAuthor] = useState("Super Cool Author - that's you!");
    let [localLastEdited, setLocalLastEdited] = useState(Date.now());
    // By default each of these parameters will have an input field assigned to them
    // But Id and LastEdited should not take an input from the user

    // The function that handles the button event below to submit all the data to state
    const handleSubmission = () => {
        setJournalEntries(currentJournalEntries => {
            let newEntry = {
                lastEdited: Date.now(),
                author: localAuthor,
                content: localContent,
                name: localName,
                type: localType,
                id: localId
            }
            // Makes a copy of the array and then combines the new piece of data/the new object
            return [...currentJournalEntries, newEntry];

        })
    }


    // input name needs to match the htmlfor in the label
    return(
        <>
            <label htmlFor="localName">Entry Title: </label>
            <input 
                type="text" 
                name="localName" 
                value={localName} 
                defaultValue={localName} 
                onChange={(event) => setLocalName(event.target.value)}
            />

            <label htmlFor="localAuthor">Author: </label>
            <input 
                type="text" 
                name="localAuthor" 
                value={localAuthor} 
                defaultValue={localAuthor} 
                onChange={(event) => setLocalAuthor(event.target.value)}
            />

            <label htmlFor="localContent">Content: </label>
            <input 
                type="text" 
                name="localContent" 
                value={localContent} 
                defaultValue={localContent} 
                onChange={(event) => setLocalContent(event.target.value)}
            />

            <label htmlFor="localType">Entry Type: </label>
            <input 
                type="text" 
                name="localAuthor" 
                value={localType} 
                defaultValue={localType} 
                onChange={(event) => setLocalType(event.target.value)}
            />
            <button onClick={handleSubmission}>
                Submit new entry
            </button>
        </>
    )

}
