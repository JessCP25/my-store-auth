const bcrypt =  require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin123';
  const hash = '$2b$10$GIh8PJDehdvXcUVsKtmT9u94Hp6ovJxifni4e0CPmBRd.51ZIP2UK';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
