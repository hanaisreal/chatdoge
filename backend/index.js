const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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"
var cors = require('cors')

//express framework for server
const express = require('express')
const app = express()

//from open API to apply chatting
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);


//CORS issue 해결: 요청을 확인해주는 과정을 껐다
app.use(cors());

// POST 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/fortuneTell', async function (req, res) {  //요청을 post로 받아서 요청을 json으로 반환한다. 
  let userMessage = req.body.messages[0].content;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {role: "system", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. "}, 
        {role: "user", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. "},
        {role: "assistant", content:"안녕하세요, 챗도지입니다. 저는 운세와 점성술에 대해 많은 경험과 지식을 가지고 있습니다. 궁금한 점이 있으시면 언제든지 물어보세요. 어떤 질문이든 명확한 답변을 드릴 수 있습니다."},
        {role: "user", content: userMessage},
      ],
  });

  let reply = completion.data.choices[0].message;
  console.log(reply); 
  res.json({"assistant": reply});

});
app.listen(3000)

