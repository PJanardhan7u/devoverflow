import React from "react";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { getTimestamp,formatAndDivideNumber } from "@/lib/utils";



interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* if signed in */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">

      <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={`- asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor

          textStyles="small-regular text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatAndDivideNumber(upvotes)}
          title="votes"
          textStyles="body-medium text-dark400_light700"
        />

        

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatAndDivideNumber(answers.length)}
          title="Answers"
          textStyles="small-regular text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatAndDivideNumber(views)}
          title="views"
          textStyles="small-regular text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
