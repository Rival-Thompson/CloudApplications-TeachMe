# Description data model
## Teacher data
{$id:[id],email:[email],password:[password],profile:{FirstName:[firstname],LastName:[lastname],School:[school]}}

## Lesson data
{$id:[id], Teacher:[TeacherId],Name:[LessonName],Subject:[LessonSubject],Token:[token],Questions:[arrayWithQuestions]}

## Question data

1. *open vraag*
----------
{type:"Open",question:[de vraag],answers:[array met antwoordObjecten]}
2. *multiplechoice vraag*
----------
{type:"Mp",question:[de vraag],options:[array of options],answers:[array met antwoordObjecten]}
3. *code vraag*
----------
{type:"Code",question:[de vraag],example:[VoorbeeldCode],answers:[array met antwoordObjecten]}

## Answer data
{answer:[the given/ selected answer], *student:[student naam]*, rating:[rating score]