/* eslint-disable no-lone-blocks */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import {
  Col,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from 'reactstrap';
import axios from 'axios';
// import PaginationComponent from 'react-reactstrap-pagination';
import Photo from './Photo';
import '../App.css';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albumNo, setAlbumNo] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${albumNo}/photos`)
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  }, [albumNo]);
  return (
    <div>
      <Container className="w-100 mt-3">
        <h1>Image Album</h1>
        <Row className="w-100 mx-auto">
          {loading ? (
            <div className="mx-auto col-4 ">
              <Spinner
                animation="border"
                style={{height: '5rem', width: '5rem'}}
                color="warning"
              />
            </div>
          ) : (
            photos.map((val) => {
              return (
                <Col lg="3" md="4">
                  <Photo
                    AlbumId={val.albumId}
                    Id={val.id}
                    Thumbnail={val.thumbnailUrl}
                    Title={val.title}
                    Url={val.url}
                  />
                </Col>
              );
            })
          )}
        </Row>
        <Pagination
          aria-label="Page navigation example"
          size="lg"
          className="mx-5"
        >
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(1)} href="#">
              First
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                if (albumNo > 1) {
                  setAlbumNo(albumNo - 1);
                } else {
                  setAlbumNo(1);
                }
              }}
              href="#"
            >
              Previous
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(1)} href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(2)} href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(3)} href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(4)} href="#">
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(5)} href="#">
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                if (albumNo >= 100) {
                  setAlbumNo(100);
                } else {
                  setAlbumNo(albumNo + 1);
                }
              }}
              href="#"
            >
              Next
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setAlbumNo(100)} href="#">
              Last
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>
    </div>
  );
}
