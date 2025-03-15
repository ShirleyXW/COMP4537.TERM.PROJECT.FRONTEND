from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Union[str, None] = None
    email: Union[str, None] = None


class User(BaseModel):
    user_id: int
    email: str | None = None
    username: str | None = None


class UserInDB(User):
    hashed_password: str




def main():
    pass


if __name__ == '__main__':
    main()
