import { useEffect, useState } from "react";
import { useJournalEntriesData } from "../contexts/EntriesContext";
import EntryForm from "./EntryForm";
import ViewEntry from "./ViewEntry";


export default function JournalEntryContainer({entryId}){

    // 
    let [isEditing, setEditing] = useState(false);
    let journalEntriesData = useJournalEntriesData();

    let [currentJournalEntry, setCurrentJournalEntry] = useState({});

    useEffect(() => {
        // On componentDidMount, Retrieve journal entry with id of {entryId}
        // from {journalEntriesData}
        // and set that into {currentJournalEntry}
        // If this condition returns true then it will return that object
        // If the id for that entry matches the prop of this component then its possible to retrieve that object
        let currentEntry = journalEntriesData.find((entry) => entry.id == entryId);
        setCurrentJournalEntry(currentEntry);
        
    }, [journalEntriesData]);
    // There was a problem where editing the post wasnt being reflected once it was said to finish editing
    // The useEffect function needed to depend on journalEntriesData so that it would keep its data up to date

    if (isEditing){
        return  <>
            <EntryForm entryId={currentJournalEntry.id} />
            <button onClick={() => setEditing(false)}>
                Start Editing
            </button>
        </>
    } else {
        // Passes the currentJournalEntry state variable to the ViewEntry Component
        return  <>
            <ViewEntry journalEntry={currentJournalEntry} />
            <button onClick={() => setEditing(false)}>
                Start Editing
            </button> 
        </>
    
    }

    // return(
    //     <>
    //         (isEditing ?
    //         <EntryForm entryId={currentJournalEntry.id} />
    //         : 
    //         <ViewEntry entryId={currentJournalEntry.id} />)
    //     </>
    // )
    // If isEditing is true, passes in the currentEntry as a prop to the form 
    // If false passes the currentEntry as a prop to the ViewEntry
}