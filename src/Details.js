import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTIONS, CREATE_ANSWER, UPDATE_QUESTION } from "./queries";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState(null);
  const [addAnswer] = useMutation(CREATE_ANSWER, {
    refetchQueries: [GET_QUESTIONS, "QuestionAll"],
  });
  const [updateQuestion] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [GET_QUESTIONS, "QuestionAll"],
  });
  const params = useParams();
  const saveAnswer = () => {
    addAnswer({
      variables: {
        answerCreateOneRecord: {
          questionId: params.id,
          response: parseInt(answerValue),
          surveyId: Date.now().toString(),
        },
      },
    });
  };
  const saveQuestion = () => {
    updateQuestion({
      variables: {
        id: params.id,
        record: { text: questionValue, description: questionDescription },
      },
    });
  };

  const setAnswer = (arg) => {
    setAnswerValue(arg.target.value);
  };

  const { loading, error, data } = useQuery(GET_QUESTIONS);
  useEffect(() => {
    const curentQuery = data?.questionAll?.find?.((item) => {
      return item._id == params.id;
    });
    if (curentQuery) {
      setQuestionDescription(curentQuery.description);
      setQuestionValue(curentQuery.text);
    }
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const curentQuery = data?.questionAll?.find?.((item) => {
    return item._id == params.id;
  });
  
  const answersTotal = curentQuery.answers.reduce((prev, cur) => {
    return prev + cur.response;
  }, 0);

  return (
    <>
      <h2>questions details {params.id}</h2>
      <p>
        <strong>title: </strong>
        {curentQuery.text}{" "}
      </p>
      <p>
        <strong>description: </strong>
        {curentQuery.description}{" "}
      </p>
      <p>
        <strong>number of answers: </strong>
        {curentQuery.answers.length}{" "}
      </p>
      <p>
        <strong>avg: </strong>
        {answersTotal / curentQuery.answers.length}{" "}
      </p>
      <div onChange={setAnswer}>
        <input type="radio" value="1" name="answer" /> 1
        <input type="radio" value="2" name="answer" /> 2
        <input type="radio" value="3" name="answer" /> 3
        <input type="radio" value="4" name="answer" /> 4
        <input type="radio" value="5" name="answer" /> 5
      </div>
      {answerValue && <button onClick={saveAnswer}>Save Answer</button>}
      <hr />
      <input
        onChange={(event) => setQuestionValue(event.target.value)}
        placeholder="enter question"
        value={questionValue}
      />
      <input
        onChange={(event) => setQuestionDescription(event.target.value)}
        placeholder="enter Description"
        value={questionDescription}
      />
      <button onClick={saveQuestion}>Save Question</button>
    </>
  );
};

export default Details;
