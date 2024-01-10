import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.actions";


const RightSidebar = () => {

    const hotQuestions=[
      {
        _id:1,
        title:'How do I use express as a custum servr in Nextjs'
      },
      {
        _id:2,
        title:'How do I use express as a custum servr in Nextjs'
      },
      {
        _id:3,
        title:'How do I use express as a custum servr in Nextjs'
      },
      {
        _id:4,
        title:'How do I use express as a custum servr in Nextjs'
      },
      {
        _id:5,
        title:'How do I use express as a custum servr in Nextjs'
      }
    ]

    const popularTags=[
      {
        _id:1,
        name:'Nextjs',
        totalQuestions: 100
      },
      {
        _id:2,
        name:'react',
        totalQuestions: 100
      },
      {
        _id:3,
        name:'javascript',
        totalQuestions: 100
      },
      {
        _id:4,
        name:'Vuejs',
        totalQuestions: 100
      },
      {
        _id:5,
        name:'Redux',
        totalQuestions: 100

      }
    ]
    

  return (
    <div>
      <section className="background-light900_dark200 light-border custom-scrollbar 
        sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l 
        p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
        <div>
        <div>
        <h3 className="h3-bold text-dark200_light900">
          Top questions</h3>

        </div>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
              src="/assets/icons/chevron-right.svg"
              alt="chevron right"
              width={20}
              height={20}
              className="invert-colors"
              >

              </Image>
              </Link>
            ))}

        </div>
        </div>
        
        <div>
        <div>
        <h3 className="h3-bold text-dark200_light900">
          Popular tags</h3>
        </div>

          <div className="mt-7 flex w-full flex-col gap-4">
              {
                popularTags.map((tag)=>(
                  <RenderTag key={tag._id} _id={tag._id} 
                    name={tag.name} totalQuestions={tag.totalQuestions}
                    showCount
                  />
                ))
              }
          </div>


        </div>
        

        
      </section>

    </div>
  )
}

export default RightSidebar