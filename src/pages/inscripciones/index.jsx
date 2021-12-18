import React,{useEffect} from 'react'
import { GET_INSCRIPCIONES } from '../../graphql/inscripciones/queries';
import { useMutation, useQuery } from '@apollo/client';
import { APROBAR_INSCRIPCION,RECHAZAR_INSCRIPCION } from '../../graphql/inscripciones/mutations';
import ButtonLoading from '../../components/ButtonLoading';
import { toast } from 'react-toastify';
import {AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled, } from '../../components/Accordinon';
import PrivateRoute from '../../components/PrivateRoute';
import PrivateComponent from '../../components/PrivateComponent';

const IndexInscripciones = () => {
    // falta capturar error de query
    const { data, loading, refetch } = useQuery(GET_INSCRIPCIONES);
  
    if (loading) return <div>Loading...</div>;
    return (
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='p-10'>
          <div className='text-black flex justify-center  font-bold   text-2xl'>Pagina de inscripciones</div>
          <div className='my-4'>
            <AccordionInscripcion
              titulo='Inscripciones aprobadas'
              data={data.Inscripcion.filter((el) => el.estado === 'ACEPTADA')}
            />
            <AccordionInscripcion
              titulo='Inscripcion pendientes'
              data={data.Inscripcion.filter((el) => el.estado === 'PENDIENTE')}
              refetch={refetch}
            />
            <AccordionInscripcion
              titulo='Inscripcion rechazadas'
              data={data.Inscripcion.filter((el) => el.estado === 'RECHAZADA')}
            />
          </div>
        </div>
      </PrivateComponent>
    );
  };
  
  const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='flex'>
          {data &&
            data.map((inscripcion) => (
              <Inscripcion inscripcion={inscripcion} refetch={refetch} />
            ))}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
  
  const Inscripcion = ({ inscripcion, refetch }) => {

    const [aprobarInscripcion, { data, loading, error }] =
      useMutation(APROBAR_INSCRIPCION);

    const [rechazarIncripcion, {data:datamutation, loading:dataloading,error:dataerror}]=useMutation(RECHAZAR_INSCRIPCION);

  
    useEffect(() => {
      if (data) {
        toast.success('Inscripcion aprobada con exito');
        refetch();
      }
    }, [data]);
  
    useEffect(() => {
      if (error) {
        toast.error('Error aprobando la inscripcion');
      }
    }, [error]);
    useEffect(() => {
      if (datamutation) {
        toast.success('Inscripcion Rechazar con exito');
        refetch();
      }
    }, [datamutation]);
  
    useEffect(() => {
      if (dataerror) {
        toast.error('Error Rechazar la inscripcion');
      }
    }, [dataerror]);
  
    const cambiarEstadoInscripcion = () => {
      aprobarInscripcion({
        variables: {
          _id: inscripcion._id,
        },
      });
    };
    const rechazarEstadoIncripcion=()=>{
     rechazarIncripcion({
       variables: {
         _id: inscripcion._id,
       }
     })
    }
  
    return (
      <div className='bg-white shadow-lg text-black flex flex-col p-6 m-2 rounded-lg '>
        <span>{inscripcion.proyecto.nombre}</span>
        <span>  EST: {inscripcion.estudiante.nombre}</span>
        <span>{inscripcion.estado}</span>
        {inscripcion.estado === 'PENDIENTE' && (
          <>
          <ButtonLoading
            onClick={() => {
              cambiarEstadoInscripcion();
            }}
            text='Aprobar Inscripcion'
            loading={loading}
            disabled={false}
          />
          <ButtonLoading
            onClick={() => {
              rechazarEstadoIncripcion();
            }}
            text='Rechazar Inscripcion'
            loading={loading}
            disabled={false}
          />
          </>
         
        )}
      </div>
    );
  };
  
  export default IndexInscripciones;
