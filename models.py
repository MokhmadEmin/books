from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Writer(models.Model):
	id = fields.IntField(pk=True)
	nickname = fields.CharField(max_length=30, unique=True)
	name = fields.CharField(max_length=50)
	surname = fields.CharField(max_length=85)
	icon = fields.BinaryField()
	password = fields.CharField(max_length=20)
	description = fields.CharField(max_length=500)


class Book(models.Model):
	id = fields.IntField(pk=True)
	author = fields.ForeignKeyField('models.Writer', on_delete=fields.CASCADE)
	name = fields.CharField(max_length=200)
	description = fields.CharField(max_length=500)
	icon = fields.BinaryField()
	text = fields.CharField(max_length=1_000_000)


Writer_Pydantic = pydantic_model_creator(Writer, name="Writer")
Book_Pydantic = pydantic_model_creator(Book, name="Book")
