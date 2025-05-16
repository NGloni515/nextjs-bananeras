import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import { ExporterMaterialStock } from '../../types/winery/exporterMaterialStock.response';
import { MATERIAL_TYPE_LABELS } from '../../utils/materialTypeLabels';

export default function DetailExporterMaterialStock({
  material,
  width,
}: {
  material: ExporterMaterialStock;
  width: { sm: number; md: number };
}): JSX.Element {
  const {
    materialType,
    assignedStock,
    currentStock,
    assignedCost,
    currentCost,
    materialDetail,
  } = material;

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton pl='60px' width={{ sm: width.sm, md: width.md }}>
            <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
              Detalles del Material
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pl='60px' pb={4}>
          <p>
            <strong>Nombre Comercial:</strong> {materialDetail.name}
          </p>
          <p>
            <strong>Código:</strong> {materialDetail.code}
          </p>
          <p>
            <strong>Tipo de Material:</strong>{' '}
            {MATERIAL_TYPE_LABELS[materialType] ?? materialType}
          </p>
          <p>
            <strong>Stock Asignado:</strong> {assignedStock} unidades
          </p>
          <p>
            <strong>Stock Actual:</strong> {currentStock} unidades
          </p>
          <p>
            <strong>Costo Asignado:</strong> ${assignedCost.toFixed(2)}
          </p>
          <p>
            <strong>Costo Actual:</strong> ${currentCost.toFixed(2)}
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
