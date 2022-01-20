import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
  query QuestionAll {
    questionAll {
      text
      _id
      description
      answers {
        response
      }
    }
  }
`;
export const CREATE_ANSWER = gql`
  mutation AnswerCreateOne($answerCreateOneRecord: CreateOneAnswerInput!) {
    answerCreateOne(record: $answerCreateOneRecord) {
      record {
        questionId
        response
        surveyId
      }
    }
  }
`;
export const CREATE_QUESTION = gql`
  mutation QuestionCreateOne(
    $questionCreateOneRecord: CreateOneQuestionInput!
  ) {
    questionCreateOne(record: $questionCreateOneRecord) {
      record {
        text
      }
    }
  }
`;
export const REMOVE_QUESTION = gql`
  mutation QuestionRemoveOne($id: MongoID!) {
    questionRemoveOne(_id: $id) {
      recordId
    }
  }
`;
export const UPDATE_QUESTION = gql`
  mutation QuestionUpdateOne($id: MongoID!, $record: UpdateByIdQuestionInput!) {
    questionUpdateOne(_id: $id, record: $record) {
      recordId
    }
  }
`;
