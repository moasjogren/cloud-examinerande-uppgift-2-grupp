import { Entry } from '../app/types/EntryTypes'

interface EntryCardProps {
   entry: Entry
 }

 export default function EntryCard({ entry }: EntryCardProps) {
       const formattedDate = new Date(entry.createdAt).toLocaleDateString("en-GB", {
	year: "numeric",
 		month: "long",
 		day: "numeric",
 		hour: "2-digit",
 		minute: "2-digit",
 	});

   return (
     <div className="card">
       <div className="mb-4">
         <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
           {formattedDate}
         </div>
         <h2 className="text-2xl font-serif text-dark-brown [html.dark_&]:text-cream mb-3">{entry.title}</h2>
       </div>
       <p className="text-dark-brown/80 [html.dark_&]:text-cream/80 leading-relaxed whitespace-pre-wrap">
         {entry.content}
       </p>
     </div>
   )
 }
