import {HfInference} from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN);

export default hf;
