"""empty message

Revision ID: fa05cbb71ec9
Revises: 468184cff5de
Create Date: 2022-02-22 11:14:18.153252

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa05cbb71ec9'
down_revision = '468184cff5de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('videos', sa.Column('views', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('videos', 'views')
    # ### end Alembic commands ###
