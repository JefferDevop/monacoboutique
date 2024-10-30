import { useQuery } from '@tanstack/react-query';
import { SlidersApi } from '@/api/sliders';
import { ListCategories, Sliders, Separator } from '@/components';
import { BasicLayout } from '@/layouts';


const slidersCtrl = new SlidersApi();

export default function HomePage() {
 
  const { data: sliders, isLoading: loadingSliders } = useQuery({
    queryKey: ['sliders'],
    queryFn: () => slidersCtrl.getAll(),
   
  });

  if ( loadingSliders) {

    return (
      <BasicLayout>
        <p>Cargando...</p>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <Separator />
      <Sliders gallery={sliders} />
      <ListCategories />    
    </BasicLayout>
  );
}