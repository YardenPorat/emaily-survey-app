const express = require('express');
const app = express();

app.get('/', (req, res) => res.send({ hi: 'there' }));

const PORT = process.env.PORT || 5000; // Dynamic Port Binding
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
