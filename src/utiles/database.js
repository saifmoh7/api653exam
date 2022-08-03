import Axios, * as others from 'axios';

export const getExamsList = async() => {
    try {
        const {data} = await Axios.get('http://192.168.37.190:5000/api/exams/showexams');
        return data;
    } catch (error) {
        return error
    }
}

export const getQuestionsList = async(examId) => {
    try {
        const {data} = await Axios.post('http://192.168.37.190:5000/api/questions/showquestions', {examId});
        return data;
    } catch (error) {
        return error
    }
}