

import axios from "axios";


exports.useHttpGet = async (url) => { return await axios.get(url) };
exports.useHttpDelete = async (url) => { return await axios.delete(url) };
exports.useHttpPost = async (url, payload) => { return axios.post(url, payload); }
exports.useHttpPut = async (url, payload) => { return axios.put(url, payload); }


