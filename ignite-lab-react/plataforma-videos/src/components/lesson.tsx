import {CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { Link } from 'react-router-dom';

interface LessonProps{
    title: string;
    slug: string;
    availableAt:Date;
    type:'live' | 'class'
}
export const Lesson = (props:LessonProps) =>{

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormated = format(props.availableAt,"EEEE' - 'd' de 'MMMM' - 'k'h'mm",{locale:ptBR})
    return (
        <Link to={`/event/lessson/${props.slug}`} className="group"> 
            <span className="text-gray-300"> 
               {availableDateFormated}
            </span>
            <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                            <CheckCircle size={20}/>
                            Conteúdo liberado
                        </span>
                    ):(
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20}/>
                            Em Breve
                        </span>
                    )}
                    <span className="text-xs rounded py-[2px] px-2 text-white border border-green-300">
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRATICA'} 
                    </span>
                </header>
                <span className="text-gray-200 mt-5 block font-bold">
                    {props.title}
                </span>
            </div>
        </Link>
    )
}