import Axios, * as others from 'axios';

export const getExamsList = async() => {
    try {
        const {data} = await Axios.get('https://peaceful-temple-39268.herokuapp.com/api/exams/showexams');
        return data;
    } catch (error) {
        return error
    }
}

export const getQuestionsList = async(examId) => {
    try {
        const {data} = await Axios.post('https://peaceful-temple-39268.herokuapp.com/api/questions/showquestions', {examId});
        return data;
    } catch (error) {
        return error
    }
}

export const getVersion = async() => {
    try {
        const {data} = await Axios.get('https://peaceful-temple-39268.herokuapp.com/api/users/version');
        return data;
    } catch (error) {
        return null
    }
}

export const getUpgradeURL = async() => {
    try {
        const {data} = await Axios.get('https://peaceful-temple-39268.herokuapp.com/api/users/version/url');
        return data;
    } catch (error) {
        return null
    }
}

// export const signUp = async(name, email, password) => {
//     try {
//         const {data} = await Axios.post('https://peaceful-temple-39268.herokuapp.com/api/users/signup', {name, email, password});
//         return data;
//     } catch (error) {
//         return error
//     }
// }

// export const signIn = async(email, password) => {
//     try {
//         const {data} = await Axios.post('https://peaceful-temple-39268.herokuapp.com/api/users/signin', {email, password});
//         return data;
//     } catch (error) {
//         return error
//     }
// }