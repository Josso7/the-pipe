"""empty message

Revision ID: 08c8366b0098
Revises: 001e49862795
Create Date: 2022-02-23 15:30:15.132714

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '08c8366b0098'
down_revision = '001e49862795'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('created_at_date', sa.String(length=100), nullable=False))
    op.add_column('comments', sa.Column('created_at_time', sa.TIME(), nullable=False))
    op.drop_column('comments', 'created_at')
    op.drop_column('comments', 'updated_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('comments', sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.drop_column('comments', 'created_at_time')
    op.drop_column('comments', 'created_at_date')
    # ### end Alembic commands ###
