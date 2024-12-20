

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

import { useEffect, useState } from "react";
import { useJournalEntriesData, useJournalEntriesSetter } from "../contexts/EntriesContext";


// Because the JournalEntry page will find posts via entryIds, entryIds needs to be passed in as a prop so it can be used
export default function EntryForm({entryId}){
    let journalEntriesData = useJournalEntriesData();
    let setJournalEntries = useJournalEntriesSetter();

    // If entry id is provided as a prop then it is used in the state, if it is not there, then an empty string is used ""
    // These are generated when the component loads
    let [localId, setLocalId] = useState(entryId ? entryId.toString() : null);
    let [localType, setLocalType] = useState("journal");
    let [localName, setLocalName] = useState("Default Post Name");
    let [localContent, setLocalContent] = useState("Write your journal entry here.");
    let [localAuthor, setLocalAuthor] = useState("Super Cool Author - that's you!");
    // By default each of these parameters will have an input field assigned to them
    // But Id and LastEdited should not take an input from the user


    useEffect(() => {
        if (localId){
            // checks each object in journalEntriesData, if the entry.id is == to localId then the specific post variable is set to this object
            let specificPost = journalEntriesData.find((entry) => entry.id == localId);

            setLocalAuthor(specificPost.author);
            setLocalContent(specificPost.content);
            setLocalName(specificPost.name);
            setLocalType(specificPost.type);
        }

    }, [localId]);

    // The function that handles the button event below to submit all the data to state
    // These alter/ are generated when the form is submitted to thecontext system
    const handleSubmission = () => {
            setJournalEntries(currentJournalEntries => {


                if (localId){
                // If ID exists, we are EDITING
                console.log("Searching existing data for ID of: " + localId);
                let tempEntriesCopy = [...currentJournalEntries];

                tempEntriesCopy.forEach((entry, index) => {
                    if (entry.id == localId){
                        tempEntriesCopy[index] = {
                            lastEdited: Date.now(),
                            author: localAuthor,
                            content: localContent,
                            name: localName,
                            type: localType,
                            id: localId ? localId : crypto.randomUUID()
                        }
                    }
                });
                return tempEntriesCopy;

                // Makes a copy of the array and then combines the new piece of data/the new object

            } else {        
                let newEntry = {
                    lastEdited: Date.now(),
                    author: localAuthor,
                    content: localContent,
                    name: localName,
                    type: localType,
                    id: localId ? localId : crypto.randomUUID()
                }
                return [...currentJournalEntries, newEntry];
            }

        });
    }


    


    // input name needs to match the htmlfor in the label
//     return(
//         <>
//             <label htmlFor="localName">Entry Title: </label>
//             <input 
//                 type="text" 
//                 name="localName" 
//                 value={localName} 
//                 defaultValue={localName} 
//                 onChange={(event) => setLocalName(event.target.value)}
//             />

//             <label htmlFor="localAuthor">Author: </label>
//             <input 
//                 type="text" 
//                 name="localAuthor" 
//                 value={localAuthor} 
//                 defaultValue={localAuthor} 
//                 onChange={(event) => setLocalAuthor(event.target.value)}
//             />

//             <label htmlFor="localContent">Content: </label>
//             <input 
//                 type="text" 
//                 name="localContent" 
//                 value={localContent} 
//                 defaultValue={localContent} 
//                 onChange={(event) => setLocalContent(event.target.value)}
//             />

//             <label htmlFor="localType">Entry Type: </label>
//             <input 
//                 type="text" 
//                 name="localAuthor" 
//                 value={localType} 
//                 defaultValue={localType} 
//                 onChange={(event) => setLocalType(event.target.value)}
//             />
//             <button onClick={handleSubmission}>
//                 Submit new entry
//             </button>
//         </>
//     )

// }
    return(
        <>
            <label htmlFor="localName">Entry Title:</label>
            <input 
                type="text" 
                name="localName" 
                value={localName} 
                onChange={(event) => setLocalName(event.target.value)}
            />

            <label htmlFor="localAuthor">Author:</label>
            <input 
                type="text" 
                name="localAuthor" 
                value={localAuthor} 
                onChange={(event) => setLocalAuthor(event.target.value)}
            />
            

            <label htmlFor="localContent">Entry Content:</label>
            <input 
                type="text" 
                name="localContent" 
                value={localContent} 
                onChange={(event) => setLocalContent(event.target.value)}
            />

            <label htmlFor="localType">Entry Type:</label>
            <input 
                type="text" 
                name="localType" 
                value={localType} 
                onChange={(event) => setLocalType(event.target.value)}
            />

            <button onClick={handleSubmission}>
                Submit new entry
            </button>
        </>
    );
}