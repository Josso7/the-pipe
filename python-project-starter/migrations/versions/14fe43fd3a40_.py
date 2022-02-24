"""empty message

Revision ID: 14fe43fd3a40
Revises: 08c8366b0098
Create Date: 2022-02-23 15:31:39.109982

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '14fe43fd3a40'
down_revision = '08c8366b0098'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('created_at_date', sa.String(length=100), nullable=False))
    op.add_column('comments', sa.Column('created_at_time', sa.TIME(), nullable=False))
    op.drop_column('comments', 'updated_at')
    op.drop_column('comments', 'created_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('comments', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.drop_column('comments', 'created_at_time')
    op.drop_column('comments', 'created_at_date')
    # ### end Alembic commands ###
