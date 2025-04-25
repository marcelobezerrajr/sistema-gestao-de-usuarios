"""merge cpf e outro caminho

Revision ID: c5c7efbc76d2
Revises: c3e2a1d14e3e, 2e3b82baede2
Create Date: 2025-04-25 13:42:59.253351

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c5c7efbc76d2'
down_revision: Union[str, None] = ('c3e2a1d14e3e', '2e3b82baede2')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
