import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTIONS, CREATE_QUESTION, REMOVE_QUESTION } from "./queries";
import { Link } from "react-router-dom";

const Home = () => {
  const [addQuestion] = useMutation(CREATE_QUESTION, {
    refetchQueries: [GET_QUESTIONS, "QuestionAll"],
  });
  const [removeQuestion] = useMutation(REMOVE_QUESTION, {
    refetchQueries: [GET_QUESTIONS, "QuestionAll"],
  });
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const saveQuestion = () => {
    addQuestion({
      variables: {
        questionCreateOneRecord: {
          text: questionValue,
          description: null,
        },
      },
    });
    setQuestionDescription("");
    setQuestionValue("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const renderElement = (question) => {
    return (
      <p>
        {question.text}
        {"  "}
        <Link to={`/question/${question._id}`}>open details</Link>
        <button
          onClick={() => removeQuestion({ variables: { id: question._id } })}
        >
          Remove Question
        </button>
      </p>
    );
  };
  return (
    <>
      <h1>questions</h1>
      {data.questionAll.map(renderElement)}
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
      <button onClick={saveQuestion}>Add Question</button>
    </>
  );
};

export default Home;
