import { createContext } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { ArtistEventType } from "../../types/Artist";
import { useImmerReducer } from "use-immer";


export interface ActionType {
  action: 'add' | 'remove'
  keys: string 
  data: ArtistEventType
}
interface contextProps {
  collection: ArtistEventType[];
  dispatch: React.Dispatch<ActionType>;
}

export const CollectionContext = createContext<null|contextProps>(null);


type Props = {
  children: React.ReactNode
  keys: string
}


function reducer(draft:ArtistEventType[],{action,keys: key,data}: ActionType) {
  switch(action){
    case 'add': {
      draft.push(data)
      localStorage.setItem(key,JSON.stringify(draft))
      return draft
    }
    case 'remove': {
      const i = draft.findIndex((item) => item.Booth_name === data.Booth_name)
      draft.splice(i,1)
      localStorage.setItem(key,JSON.stringify(draft))
      return draft

    }
    default: {
      throw new Error('Action not found in CollectionContext')
    }
      
  }

}

export const CollectionContextProvider = ({children,keys}: Props) => {
  const item = JSON.parse(localStorage.getItem(keys) || '[]')
  const [collection, dispatch] =  useImmerReducer(reducer,item as ArtistEventType[])
  return (
    <CollectionContext.Provider value={{collection,dispatch}}>{children}</CollectionContext.Provider>
  )
}

