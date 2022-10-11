import Axios, * as others from 'axios';

export const getExamsList = async() => {
    try {
        const {data} = await Axios.get('https://exams-backend.saif7.com/api653/exams/showexams');
        return data;
    } catch (error) {
        return null
    }
}

export const getQuestionsList = async(examId) => {
    try {
        const {data} = await Axios.post('https://exams-backend.saif7.com/api653/questions/showquestions', {examId});
        return data;
    } catch (error) {
        return null
    }
}

export const getVersion = async() => {r
    try {
        const {data} = await Axios.get('https://exams-backend.saif7.com/api653/users/version');
        return data;
    } catch (error) {
        return null
    }
}

export const getUpgradeURL = async() => {
    try {
        const {data} = await Axios.get('https://exams-backend.saif7.com/api653/users/version/url');
        return data;
    } catch (error) {
        return null
    }
}
