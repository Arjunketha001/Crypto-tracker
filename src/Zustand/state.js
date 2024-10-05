import { create } from "zustand";

export const store =create((set)=>({
    currency:'usd',
    setCurrency:(newcurrency)=>set((state)=>{
        return{
            ...state,
            currency:newcurrency
        }
    })

}));

export default store;