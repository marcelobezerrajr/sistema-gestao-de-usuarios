from alembic.config import Config
from alembic import command
import os


def run_alembic_upgrade():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
    alembic_ini_path = os.path.join(base_dir, "alembic.ini")

    alembic_cfg = Config(alembic_ini_path)
    alembic_cfg.set_main_option("script_location", os.path.join(base_dir, "alembic"))
    command.upgrade(alembic_cfg, "head")
