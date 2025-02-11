import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import MainLayout from "../../layouts/MainLayout";
import "../../styles/User/view-user-page.css";

const ViewUserPage = () => {
  const { id_user } = useParams();
  const { getUser } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUser(id_user);
        setUser(userData);
      } catch (error) {
        setError("Erro ao carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id_user, getUser]);

  return (
    <MainLayout>
      <div className="view-user-container">
        <Card className="view-user-card">
          <div className="view-user-card-header">
            <h4>Detalhes do Usuário</h4>
          </div>
          <Card.Body className="view-user-card-body">
            {loading ? (
              <div className="view-user-spinner">
                <Spinner animation="border" />
                <span>Carregando dados...</span>
              </div>
            ) : error ? (
              <Alert variant="danger" className="view-user-alert">
                {error}
              </Alert>
            ) : user ? (
              <div className="user-details">
                <p>
                  <strong>ID:</strong> {user.id_user || "N/A"}
                </p>
                <hr />
                <p>
                  <strong>Username:</strong> {user.username || "N/A"}
                </p>
                <hr />
                <p>
                  <strong>Name:</strong> {user.name || "N/A"}
                </p>
                <hr />
                <p>
                  <strong>Last Name:</strong> {user.last_name || "N/A"}
                </p>
                <hr />
                <p>
                  <strong>Email:</strong> {user.email || "N/A"}
                </p>
                <hr />
                <p>
                  <strong>Telephone:</strong> {user.telephone || "N/A"}
                </p>
                <hr />
                <p>
                  <strong>Permission:</strong> {user.permission || "N/A"}
                </p>
              </div>
            ) : (
              <Alert variant="warning" className="view-user-alert">
                Usuário não encontrado.
              </Alert>
            )}
          </Card.Body>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ViewUserPage;
