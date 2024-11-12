import { createContext, useContext, useState } from "react";


// Create the context
// syntax example: SomeContextVariable = createContext(defaultValue);
// Creates the context and asigns the context data - in this case it is the empty array
const JournalEntriesDataContext = createContext([]);
const JournalEntriesSetterContext = createContext(null);

// Create custom hooks to access the context data
export function useJournalEntriesData(){
    console.log("Passing data around");
    
    // calls the useContext function with the variable name assigned data from the createConetxt function.
    let currentJournalData = useContext(JournalEntriesDataContext);
    if (currentJournalData.length == 0) {
        console.log("No entries to show!");
    }
    return currentJournalData;
}

export function useJournalEntriesSetter(){
    return useContext(JournalEntriesSetterContext);
}


// Create the context provider

// This will wrap around the app but to make sure the app data is shown as well as the provider info, it needs to access the children props
export default function JournalEntriesProvider(props){
    // The data from the provider is stored within the state, then the context provider is used to share that state
    let [journalEntries, setJournalEntries] = useState([]);

    // props.children is whatever the rest of the app is other than the wrapper
    return(

        <JournalEntriesDataContext.Provider value={journalEntries}>
            <JournalEntriesSetterContext.Provider value={setJournalEntries}>
                {props.children}
            </JournalEntriesSetterContext.Provider>

        </JournalEntriesDataContext.Provider>
        // the "value" property within the JournalEntriesContext.Provider is how the data from the JournalEntriesProvider state is passed through
    );
}

